import { createClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

interface StateParams {
  verifyCode: string;
  pubKeyHash: string;
}

function parseState(state: string): StateParams | null {
  try {
    const [verifyCode, pubKeyHash] = state.split('.');
    if (!verifyCode || !pubKeyHash) return null;
    return { verifyCode, pubKeyHash };
  } catch {
    return null;
  }
}

export async function GET(
  request: NextRequest
): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = request.nextUrl.pathname.split('/')[2]; // Get state from URL path
  const stateParams = parseState(state);
  const origin = request.nextUrl.origin;

  if (!code || !stateParams) {
    return NextResponse.redirect(
      `${origin}/sign-in?message=${encodeURIComponent(
        "Invalid authorization parameters"
      )}&type=error`
    );
  }

  const supabase = await createClient();

  // Exchange the code for a session
  const { data: { user }, error: authError } = await supabase.auth.exchangeCodeForSession(code);

  if (authError || !user) {
    console.error("Auth error:", authError?.message);
    return NextResponse.redirect(
      `${origin}/sign-in?message=${encodeURIComponent(
        authError?.message || "Authentication failed"
      )}&type=error`
    );
  }

  // Store the SSH public key
  const { error: dbError } = await supabase
    .from('user_ssh_keys')
    .upsert({
      user_id: user.id,
      pub_key_hash: stateParams.pubKeyHash,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

  if (dbError) {
    console.error("Database error:", dbError.message);
    return NextResponse.redirect(
      `${origin}/sign-in?message=${encodeURIComponent(
        "Failed to store SSH key"
      )}&type=error`
    );
  }

  return NextResponse.redirect(
    `${origin}/connect/success?message=${encodeURIComponent(
      "Successfully connected SSH key"
    )}&type=success`
  );
}
