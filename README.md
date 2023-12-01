# T3 Stack custom template

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Drizzle](https://orm.drizzle.team/)
- [shadcn](https://ui.shadcn.com/)
- [tRPC](https://trpc.io)
- [Postgres](https://tailwindcss.com)
- [lucide react](https://lucide.dev/guide/packages/lucide-react)

# shadcn add components

```bash
#example
npx shadcn-ui@latest add button
```


# Docker (db and pgadmin)

```bash
# creates docket containers
docker-compose up --build -d

# if you use pgadmin from docker the Host name/Adress would be the postgres container_name:
# example: t3stack_postgres

# add tables to db and generates prisma client
npm run db:push

# Create a dump backup
# -U username
# -d database
# -h hostname
# --data-only only data
pg_dump -h {POSTGRES_HOST} -U {POSTGRES_USER} -d {POSTGRES_DB} --data-only > ./db/dev_backup.dump

# clear database data
docker exec -i t3stack_postgres psql -U postgres -d t3stack < ./db/dev_clear_data.sql

# restore database on local docker
docker exec -i t3stack_postgres psql -U postgres -d t3stack < ./db/dev_backup.dump
```
