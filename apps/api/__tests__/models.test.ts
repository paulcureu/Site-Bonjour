// __tests__/models.test.ts
import { PrismaClient, Role, Category } from '@prisma/client';

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.review.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.user.deleteMany(); // ⬅️ updated
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('User email uniqueness (admin role)', () => {
  it('should not allow duplicate emails', async () => {
    await prisma.user.create({
      data: {
        name: 'Admin One',
        email: 'test@example.com',
        password: 'secret',
        role: Role.ADMIN, // ⬅️ enum
      },
    });

    await expect(
      prisma.user.create({
        data: {
          name: 'Admin Duplicate',
          email: 'test@example.com',
          password: 'another',
          role: Role.ADMIN,
        },
      }),
    ).rejects.toThrow();
  });
});

describe('MenuItem relationships', () => {
  it('should create review and reservation linked to menu item', async () => {
    const menuItem = await prisma.menuItem.create({
      data: {
        name: 'Pizza',
        description: 'Cheesy and good',
        price: 30,
        imageUrl: 'https://via.placeholder.com/150',
        category: Category.MAIN_COURSE, // ⬅️ enum
      },
    });

    await prisma.review.create({
      data: {
        rating: 5,
        comment: 'Delicious!',
        menuItem: { connect: { id: menuItem.id } },
      },
    });

    const reservation = await prisma.reservation.create({
      data: {
        name: 'Paul',
        email: 'paul@example.com',
        phone: '0712345678',
        people: 2,
        date: new Date(),
        menuItems: { connect: [{ id: menuItem.id }] },
      },
    });

    const reviews = await prisma.review.findMany({ where: { menuItemId: menuItem.id } });
    const reservations = await prisma.reservation.findMany({
      where: { menuItems: { some: { id: menuItem.id } } },
    });

    expect(reviews.length).toBe(1);
    expect(reservations.length).toBe(1);
    expect(reviews[0].menuItemId).toBe(menuItem.id);
    expect(reservations[0].id).toBe(reservation.id);
  });
});

describe('Cascade delete', () => {
  it('should delete reviews and disconnect reservations when menu item is deleted', async () => {
    const menuItem = await prisma.menuItem.create({
      data: {
        name: 'Burger',
        description: 'Juicy and tasty',
        price: 25,
        imageUrl: 'https://via.placeholder.com/150',
        category: Category.MAIN_COURSE,
      },
    });

    await prisma.review.create({
      data: {
        rating: 4,
        comment: 'Very good!',
        menuItem: { connect: { id: menuItem.id } },
      },
    });

    await prisma.reservation.create({
      data: {
        name: 'Alex',
        email: 'alex@example.com',
        phone: '0700000000',
        people: 3,
        date: new Date(),
        menuItems: { connect: [{ id: menuItem.id }] },
      },
    });

    await prisma.menuItem.delete({ where: { id: menuItem.id } });

    const reviews = await prisma.review.findMany({ where: { menuItemId: menuItem.id } });
    const reservations = await prisma.reservation.findMany({
      where: { menuItems: { some: { id: menuItem.id } } },
    });

    expect(reviews.length).toBe(0);
    expect(reservations.length).toBe(0);
  });
});
