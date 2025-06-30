from sqlalchemy.orm import Session
from app.models.sale import Sale, SaleItem
from app.schemas.sale import SaleCreate

#create sale and saleItem
def create_sale(db: Session, sale: SaleCreate):
    db_sale = Sale(
        customer_id=sale.customer_id,
        date=sale.date,
        total=sale.total
    )
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    # Add sale items
    for item in sale.items:
        db_item = SaleItem(
            sale_id=db_sale.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.price
        )
        db.add(db_item)
    db.commit()
    db.refresh(db_sale)
    return db_sale

#get with id sale
def get_sale(db: Session, sale_id: int):
    return db.query(Sale).filter(Sale.id == sale_id).first()

#get sales
def get_sales(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Sale).offset(skip).limit(limit).all()