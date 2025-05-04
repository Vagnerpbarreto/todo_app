import pytest
from app import create_app, db
from app.models import Task

@pytest.fixture
def client():
    app = create_app("sqlite:///:memory:")
    app.config["TESTING"] = True
    with app.app_context():
        db.create_all()
        yield app.test_client()


def test_create_task(client):
    response = client.post("/tasks", json={"title": "Nova Tarefa"})
    assert response.status_code == 201
    data = response.get_json()
    assert data["title"] == "Nova Tarefa"
    assert data["completed"] is False

def test_get_tasks(client):
    client.post("/tasks", json={"title": "Teste 1"})
    response = client.get("/tasks")
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) == 1

def test_update_task(client):
    client.post("/tasks", json={"title": "Tarefa Antiga"})
    response = client.put("/tasks/1", json={"title": "Tarefa Nova", "completed": True})
    assert response.status_code == 200
    data = response.get_json()
    assert data["title"] == "Tarefa Nova"
    assert data["completed"] is True

def test_delete_task(client):
    client.post("/tasks", json={"title": "Para deletar"})
    response = client.delete("/tasks/1")
    assert response.status_code == 204

