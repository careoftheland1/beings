// Placeholder only. Add Stripe's server SDK and real Price IDs before enabling checkout.
// Never accept browser-supplied prices; map product/variant identifiers to env Price IDs here.
exports.handler = async () => ({
  statusCode: 501,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ error: 'Stripe Checkout is not configured yet.' })
});
