IF OBJECT_ID('UrlMappings', 'U') IS NOT NULL
    DROP TABLE UrlMappings;
GO

-- Create UrlMappings table
CREATE TABLE UrlMappings (
    id INT PRIMARY KEY IDENTITY,
    original_url NVARCHAR(MAX),
    short_url NVARCHAR(100)
);
