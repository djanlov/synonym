using Microsoft.AspNetCore.Mvc;
using synonym.common.storage;

namespace reeinvent_synonym.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class SynonymController(ISynonym synonym) : ControllerBase
{
    [HttpGet("Search/{word}")]
    public SynonymSearchResult Search(string word) => synonym.Search(word);

    [HttpPost("Add/{first}/{second}")]
    public void Add(string first, string second) => synonym.Add(first, second);
}