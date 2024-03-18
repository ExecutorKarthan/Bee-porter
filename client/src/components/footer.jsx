export default function Footer() {
  return (
    <section>
      <div className='product'>
        <div className='description'>
          <h3>Help Save the Bees!</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form action='/create-checkout-session' method='POST'>
        <button type="submit" className="button">Donate Here</button>
      </form>
    </section>
  );
}