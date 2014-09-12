namespace MoreDakka.Tests

open NUnit.Framework

[<TestFixture>]
type Tests() = 

    [<Test>]
    member x.``Should Pass``() =
        Assert.That(true, Is.EqualTo true)
