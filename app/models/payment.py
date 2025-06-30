from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.db.session import Base

class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    payment_date = Column(DateTime, nullable=False)
    payment_method = Column(String, nullable=False)  # e.g., "stripe"
    status = Column(String, nullable=False)  # e.g., "completed", "pending"
    sale_id = Column(Integer, ForeignKey("sales.id"), nullable=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"), nullable=True)
    
    sale = relationship("Sale")
    booking = relationship("Booking")