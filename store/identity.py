import re

from store.models import Customer


def phone_digits(value):
    return re.sub(r"\D", "", value or "")[-10:]


def find_customer(*, user=None, email="", phone=""):
    if user is not None and user.is_authenticated:
        match = Customer.objects.filter(user=user).order_by("-date_created").first()
        if match:
            return match

    if email:
        match = (
            Customer.objects.filter(email__iexact=email.strip())
            .order_by("-date_created")
            .first()
        )
        if match:
            return match

    digits = phone_digits(phone)
    if len(digits) == 10:
        return (
            Customer.objects.filter(phone__endswith=digits)
            .order_by("-date_created")
            .first()
        )

    return None


def upsert_customer(details, user=None):
    linkable = user if (user is not None and user.is_authenticated) else None
    existing = find_customer(
        user=user,
        email=details.get("email") or "",
        phone=details.get("phone") or "",
    )

    # Never let anyone but the owner mutate a record already claimed by an account.
    if existing is not None and existing.user_id:
        if linkable is None or existing.user_id != linkable.id:
            existing = None

    if existing is None:
        return Customer.objects.create(user=linkable, **details)

    for field in ("name", "address", "phone", "email"):
        value = details.get(field)
        if value:
            setattr(existing, field, value)
    if existing.user_id is None and linkable is not None:
        existing.user = linkable
    existing.save()
    return existing
