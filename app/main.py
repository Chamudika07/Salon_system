from fastapi import FastAPI
from app.api import employee , customer , booking

app = FastAPI()

app.include_router(employee.router, prefix="/employees", tags=["employees"])
app.include_router(customer.router, prefix="/customers", tags=["customers"])
app.include_router(booking.router, prefix="/bookings", tags=["bookings"])

@app.get("/")
def read_root():
    return {"message": "Salon Management System API is running!"}