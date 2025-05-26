import { Form, useActionData } from "react-router-dom";

function Contact() {
  const data = useActionData();

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">聯絡我們</h2>
        <Form className="form form--login" method="post">
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              姓名
            </label>
            <input
              className="form__input"
              type="text"
              name="name"
              placeholder="姓名"
              required
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              留言
            </label>
            <textarea
              className="form__input"
              name="message"
              placeholder="留言內容"
              required
            />
          </div>
          <div className="form__group">
            <button type="submit" className="btn btn--green">
              送出
            </button>
          </div>
        </Form>
        {data && data.success && <h6 className="reviews__user">成功送出</h6>}
      </div>
    </main>
  );
}

export default Contact;
