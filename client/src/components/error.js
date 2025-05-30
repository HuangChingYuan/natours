const ErrorPage = (error) => {
  return (
    <main className="main">
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            錯誤頁面
          </h2>
          <h2 className="error__emoji">😢 🤯</h2>
        </div>
        <div className="error__msg">
          {error.response.data.message || "請再試一次"}
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
