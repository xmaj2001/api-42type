-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "tournamentId" TEXT;

-- AlterTable
ALTER TABLE "Tournament" ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Tournament_created_by_idx" ON "Tournament"("created_by");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;
