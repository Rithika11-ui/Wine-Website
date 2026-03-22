using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("/[controller]")]
[Authorize]
public class RewardsController : ControllerBase
{
    private readonly IRewardService _service;

    public RewardsController(IRewardService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize (Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var data = await _service.GetAllAsync();
        return Ok(new { data });
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetById(string id)
    {
        var reward = await _service.GetByIdAsync(id);
        if (reward is null)
            return NotFound(new { message = "Reward not found." });

        return Ok(new { data = reward });
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CreateRewardDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, new { data = created });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateRewardDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updated = await _service.UpdateAsync(id, dto);
        if (updated is null)
            return NotFound(new { message = "Reward not found." });

        return Ok(new { data = updated });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing is null)
            return NotFound(new { message = "Reward not found." });

        await _service.DeleteAsync(id);
        return Ok(new { message = "Reward deleted successfully." });
    }
}