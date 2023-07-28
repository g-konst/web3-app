const Greet = artifacts.require("Greet");

contract('Greet', () => {
  it("should create contract with 'Hello' as greet", async () => {
    const greetInstance = await Greet.deployed();
    const greet = await greetInstance.greet.call();

    assert.equal(greet.valueOf(), "Hello", "greet is not 'Hello'");
  });
  it("should call a function that change the greet value", async () => {
    const greetInstance = await Greet.deployed();

    const eventName = (await greetInstance.setGreet("Hi")).logs[0].event;
    assert.equal(eventName, "GreetChanged", "not expected event")

    const greet = await greetInstance.greet.call();

    assert.equal(greet.valueOf(), "Hi", "greet is not 'Hi' after function call");
  });
  it("should call a function that return a greeting with username and 'Hi' as greet", async () => {
    const greetInstance = await Greet.deployed();
    const greetings = await greetInstance.greetings("Konstantin");

    const eventName = greetings.logs[0].event;
    assert.equal(eventName, "GreetingsRequested", "not expected event")

    const _greetings = greetings.logs[0].args['0'];
    assert.equal(
      _greetings, "Hi Konstantin", "greetings is not 'Hi Konstantin'");
  });
});
