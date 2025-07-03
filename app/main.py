from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import employee , customer , booking , product , sale , payment , employee_availability , auth

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend-domain.com"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(employee.router, prefix="/employees", tags=["employees"])
app.include_router(customer.router, prefix="/customers", tags=["customers"])
app.include_router(booking.router, prefix="/bookings", tags=["bookings"])
app.include_router(product.router, prefix="/products", tags=["products"])
app.include_router(sale.router, prefix="/sales", tags=["sales"])
app.include_router(payment.router, prefix="/payments", tags=["payments"])
app.include_router(employee_availability.router, prefix="/employee-availability", tags=["employee-availability"])
app.include_router(auth.router, prefix="/auth", tags=["authentication"])


@app.get("/")
def read_root():
    return {"message": "Salon Management System API is running!"}