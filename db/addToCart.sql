insert into cart
  (userid, product_id,quantity)
VALUES
  ($1, $2, $3);

select *
from cart
where userid = $1;