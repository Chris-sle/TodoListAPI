using Microsoft.Data.SqlClient;
using TodoListAPI.Model;
using Dapper;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
const string connStr = @"Data Source=(localdb)\ProjectModels; Initial Catalog=Todo; Integrated Security=True";

app.MapGet("/todo", async () =>
{
    await using var conn = new SqlConnection(connStr);  // Use async disposal
    const string sql = "SELECT Id, Text, Done FROM Todo";
    var todoItems = await conn.QueryAsync<TodoItem>(sql);
    return Results.Ok(todoItems);
});

app.MapPost("/todo", async (TodoItem todoItem) =>
{
    await using var conn = new SqlConnection(connStr);
    const string sql = "INSERT INTO Todo (Id, Text) VALUES (@Id, @Text)";
    var rowsAffected = await conn.ExecuteAsync(sql, todoItem);
    if (rowsAffected > 0)
    {
        var createdTodo = await conn.QuerySingleAsync<TodoItem>("SELECT Id, Text, Done FROM Todo WHERE Id = @Id", new { todoItem.Id });
        return Results.Ok(createdTodo);
    }
    return Results.Problem("Failed to add task.");
});

app.MapPut("/todo", async (TodoItem todoItem) =>
{
    if (todoItem.Id == Guid.Empty)
    {
        return Results.BadRequest("TodoItem Id is required for update.");
    }

    var doneDate = DateTime.UtcNow;
    await using var conn = new SqlConnection(connStr);
    const string sql = "UPDATE Todo SET Done = @Done WHERE Id = @Id";
    var rowsAffected = await conn.ExecuteAsync(sql, new { Done = doneDate, Id = todoItem.Id });

    if (rowsAffected > 0)
    {
        var updatedTodo = await conn.QuerySingleAsync<TodoItem>("SELECT Id, Text, Done FROM Todo WHERE Id = @Id", new { todoItem.Id });
        return Results.Ok(updatedTodo);
    }

    return Results.NotFound("No task found with the provided ID.");
});

app.MapDelete("/todo/{id}", async (Guid id) =>
{
    await using var conn = new SqlConnection(connStr);
    const string sql = "DELETE FROM Todo WHERE Id = @Id";
    var rowsAffected = await conn.ExecuteAsync(sql, new { Id = id });

    if (rowsAffected == 0)
    {
        return Results.NotFound("No task found with the provided ID.");
    }

    return Results.Ok(new { RowsAffected = rowsAffected });
});

app.UseStaticFiles();
app.MapFallbackToFile("/Todo-app/public/index.html");    
app.Run();