function LoadingScreen() {
  return (
    <main className="main">
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            資料載入中...
          </h2>
          <h2 className="error__emoji">😢 🤯</h2>
        </div>
        <div className="error__msg"></div>
      </div>
    </main>
  );
}

export default LoadingScreen;
