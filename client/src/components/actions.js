export async function contactAction({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const message = formData.get("message");

  // 可以呼叫 API 或本地端處理
  console.log("收到表單資料:", name, message);

  return { success: true };
}
