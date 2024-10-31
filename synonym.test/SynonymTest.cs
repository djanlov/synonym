using synonym.common.storage;

namespace synonym.test
{
    public class Tests
    {
        private ISynonym _synonym;

        [SetUp]
        public void Setup()
        {
            _synonym = new Synonym();
        }

        [Test]
        public void TestEmpty()
        {
            const string word = "x";
            
            var result = _synonym.Search(word);

            Assert.IsNotNull(result);
            Assert.AreEqual(word, result.word);
            Assert.AreEqual(0, result.synonyms.Count());
        }

        [Test]
        public void TestAbc()
        {
            const string word = "a";

            _synonym.Add("a", "b");
            _synonym.Add("b", "c");

            var result = _synonym.Search(word);

            Assert.IsNotNull(result);
            Assert.AreEqual(word, result.word);

            var array = result.synonyms.ToArray();

            Assert.AreEqual(2, array.Length);
            Assert.AreEqual("b", array[0]);
            Assert.AreEqual("c", array[1]);
        }
    }
}