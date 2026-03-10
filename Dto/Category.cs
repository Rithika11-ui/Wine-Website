using System.ComponentModel.DataAnnotations;

public class CreateCategoryDto
{
    [Required, MaxLength(100)]
    public required string Name { get; set; }

    [MaxLength(500)]
    public string Region { get; set; } = string.Empty;
}

public class UpdateCategoryDto
{
    [MaxLength(100)]
    public string? Name { get; set; }

    [MaxLength(500)]
    public string? Region { get; set; }
}

public class CategoryResponseDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
}