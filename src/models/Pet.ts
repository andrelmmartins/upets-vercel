// schema
// id              Int               @id @default(autoincrement())
// name            String            @db.VarChar(255)
// age             Int?
// adoptionId      Int?              @unique
// adoption        Adoption?
// helpRequest     HelpRequest[]
// reports         Report[]
// universityPlace UniversityPlace[] @relation("PetToUniversityPlace")
// users           User[]            @relation("PetToUser")
// photos          Attachment[]
// careTakerId     Int?
// careTaker       User?             @relation("PetToCareTaker", fields: [careTakerId], references: [id])
// createdAt DateTime  @default(now()) @db.Timestamp(6)
// updatedAt DateTime  @updatedAt

interface Attachment {
  title: string;
  fileUrl: string;
}

export class Pet {
  readonly name: string;
  readonly age: number;
  readonly photos: Attachment[];

  constructor(obj: any) {
    try {
      if (!obj?.name || typeof obj.name !== "string")
        throw new Error("invalid pet name");
      if (!obj?.age || typeof obj.age !== "number")
        throw new Error("invalid pet age");
      if (!obj?.photos || !Array.isArray(obj.photos))
        throw new Error("invalid pet photos");

      const photos: Attachment[] = [];

      obj.photos.forEach((photo) => {
        if (
          photo?.title &&
          typeof photo.title === "string" &&
          photo?.fileUrl &&
          typeof photo.fileUrl === "string"
        ) {
          photos.push(photo);
        }
      });

      this.name = obj.name;
      this.age = obj.age;
      this.photos = photos;
    } catch (e) {
      throw e;
    }
  }
}
