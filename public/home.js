function Home() {
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="Here you can check your balance, withdraw and deposit money."
      body={<img src="bank.png" className="img-fluid" alt="Responsive image" />}
    />
  );
}
