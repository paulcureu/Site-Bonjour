import { PrismaClient, Category, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Clearing old data...');
  await prisma.review.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.user.deleteMany();

  console.log('🍽️ Creating menu items...');
  const categories: Category[] = [
    Category.APPETIZER,
    Category.MAIN_COURSE,
    Category.DESSERT,
    Category.DRINK,
  ];

  const dishes = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.menuItem.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          price: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
          imageUrl: faker.image.urlPicsumPhotos(),
          category: faker.helpers.arrayElement(categories),
        },
      }),
    ),
  );

  console.log('📅 Creating reservations...');
  await Promise.all(
    Array.from({ length: 30 }).map(() =>
      prisma.reservation.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: '+40 7' + faker.string.numeric(8),
          date: faker.date.future(),
          people: faker.number.int({ min: 1, max: 10 }),
          notes: faker.lorem.sentence(),
          menuItems: {
            connect: [
              {
                id: faker.helpers.arrayElement(dishes).id,
              },
            ],
          },
        },
      }),
    ),
  );

  console.log('👤 Creating users...');

  const adminEmail = 'admin@site.com';
  const customerEmail = 'customer@site.com';

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.createMany({
    data: [
      {
        email: adminEmail,
        name: 'Admin User',
        password: hashedPassword,
        role: Role.ADMIN,
      },
      {
        email: customerEmail,
        name: 'Customer User',
        password: hashedPassword,
        role: Role.CUSTOMER,
      },
    ],
    skipDuplicates: true,
  });

  const customer = await prisma.user.findUniqueOrThrow({
    where: { email: customerEmail },
  });

  console.log('⭐ Creating reviews...');
  await Promise.all(
    Array.from({ length: 10 }).map(() => {
      const menuItem = faker.helpers.arrayElement(dishes);
      return prisma.review.create({
        data: {
          rating: faker.number.int({ min: 1, max: 5 }),
          comment: faker.lorem.paragraph(),
          menuItemId: menuItem.id,
          userId: customer.id, // 🔑 important!
        },
      });
    }),
  );

  console.log('✅ Seed completed!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
