from fastapi import FastAPI
from app.api import employee

app = FastAPI()

app.include_router(employee.router, prefix="/employees", tags=["employees"])

@app.get("/")
def read_root():
    return {"message": "Salon Management System API is running!"}