from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.booking import BookingCreate, BookingOut
from app.crud.booking import (
    create_booking, get_booking, get_bookings, update_booking, delete_booking
)
from app.db.dependency import get_db
from app.core.deps import get_current_user , get_current_active_user 
from app.crud.customer import get_customer
from app.crud.employee import get_employee 
from app.crud.booking import serialize_booking 
router = APIRouter()

#create booking API
@router.post("/", response_model=BookingOut)
def create(
    booking: BookingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_user)
):
    customer = get_customer(db, booking.customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    if current_user.role != "customer" or current_user.email != customer.email:
        raise HTTPException(status_code=403, detail="Only the owner (customer) can create a booking.")
    db_booking = create_booking(db, booking)
    employee = get_employee(db, booking.employee_id)
    return {
        "id": db_booking.id,
        "employee_id": db_booking.employee_id,
        "customer_id": db_booking.customer_id,
        "date": db_booking.date,
        "status": db_booking.status,
        "customer_name": customer.name if customer else None,
        "employee_name": employee.name if employee else None
    }

#get bookings API
@router.get("/", response_model=list[BookingOut])
def list_bookings(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    bookings = get_bookings(db, skip=skip, limit=limit)
    return [serialize_booking(db, b) for b in bookings]

#get with id booking API
@router.get("/{booking_id}", response_model=BookingOut)
def read_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = get_booking(db, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return serialize_booking(db, booking)

#update with id booking API
@router.put("/{booking_id}", response_model=BookingOut)
def update(booking_id: int, booking: BookingCreate, db: Session = Depends(get_db)):
    updated = update_booking(db, booking_id, booking)
    if not updated:
        raise HTTPException(status_code=404, detail="Booking not found")
    return serialize_booking(db, updated)
#delet id with booking API
@router.delete("/{booking_id}")
def delete(booking_id: int, db: Session = Depends(get_db)):
    deleted = delete_booking(db, booking_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"ok": True}