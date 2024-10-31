namespace synonym.common.storage;

public record struct SynonymSearchResult(string word, IEnumerable<string> synonyms);

public interface ISynonym
{
    void Add(string first, string second);
    SynonymSearchResult Search(string word);
}

public class Synonym : ISynonym
{
    

    private readonly int _capacity;

    public Synonym(int capacity=1000)
    {
        _capacity = capacity;
        _dictWords = new(_capacity, StringComparer.OrdinalIgnoreCase);
        _dictSynonyms = new(_capacity);
    }

    private readonly Dictionary<string, Guid> _dictWords;
    private readonly Dictionary<Guid, LinkedList<string>> _dictSynonyms;

    public void Add(string first, string second)
    {
        var ids = new Guid[2];
        var exists = new[] { _dictWords.TryGetValue(first, out ids[0]), _dictWords.TryGetValue(second, out ids[1]) };

        if (!exists[0] && !exists[1])
        {
            ids[0] = Guid.NewGuid();
            _dictWords.Add(first, ids[0]);
            _dictWords.Add(second, ids[0]);
            _dictSynonyms.Add(ids[0], new LinkedList<string>(new[] { first, second }));
        }
        else if (!exists[0])
        {
            _dictWords.Add(first, ids[1]);
            _dictSynonyms[ids[1]].AddLast(first);
        }
        else if (!exists[1])
        {
            _dictWords.Add(second, ids[0]);
            _dictSynonyms[ids[0]].AddLast(second);
        }
    }

    private static IEnumerable<string> SkipValue(IEnumerator<string> enumerator, string value)
    {
        while (enumerator.MoveNext())
            if (!enumerator.Current.Equals(value, StringComparison.CurrentCultureIgnoreCase))
                yield return enumerator.Current;
    }

    public SynonymSearchResult Search(string word)
    {
        var kvp = _dictWords.SingleOrDefault(p => p.Key.Equals(word, StringComparison.CurrentCultureIgnoreCase));

        return kvp.Key is not null
            ? new SynonymSearchResult(kvp.Key, SkipValue(_dictSynonyms[kvp.Value].GetEnumerator(), word))
            : new SynonymSearchResult(word, Enumerable.Empty<string>());
    }
}