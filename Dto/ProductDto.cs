using System.ComponentModel.DataAnnotations;

public class CreateProductDto
{
    [Required, MaxLength(200)]
    public required string Name { get; set; }

    [Range(0, double.MaxValue)]
    public required float Volume { get; set; }

    [Range(0, 100)]
    public required float Alcohol { get; set; }

    [Required, MaxLength(1000)]
    public required string Description { get; set; }

    [Range(0, double.MaxValue)]
    public required decimal Price { get; set; }

    public string CategoryId { get; set; } = string.Empty;

    [MaxLength(255)]
    public string Image { get; set; } = string.Empty;
}

public class UpdateProductDto
{
    [MaxLength(200)]
    public string? Name { get; set; }

    [Range(0, double.MaxValue)]
    public float? Volume { get; set; }

    [Range(0, 100)]
    public float? Alcohol { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Range(0, double.MaxValue)]
    public decimal? Price { get; set; }

    public string? CategoryId { get; set; }

    [MaxLength(255)]
    public string? Image { get; set; }
}

public class ProductResponseDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public float Volume { get; set; }
    public float Alcohol { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public float Rating { get; set; }
    public string CategoryId { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}