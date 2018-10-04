select p.id, p.img_url, c.quantity, p.price, p.desc
from cart as c
  join products as p
  on p.id = c.product_id
where c.userid = $1;