export async function GET() {
  return Response.json({
    hasKey: !!process.env.RESEND_API_KEY,
    store: process.env.STORE_EMAIL,
  });
}
