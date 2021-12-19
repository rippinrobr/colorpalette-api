import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Color {
  @PrimaryColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;

  @Column()
  number: string;

  @Column()
  name: string;

  @Column()
  mediaType: string;

  @Column()
  bodyType: string;

  @Column()
  brand: string;

  @Column()
  series: number;

  @Column()
  grade: string;

  @Column()
  line: string;

  @Column()
  cieLabValues: string;

  @Column()
  glossAverage: number;

  @Column()
  opacity: string;

  @Column()
  opacityCode: string;

  @Column()
  lightfastness: string;

  @Column()
  lightfastnessCode: string;

  @Column()
  viscosityRange: string;

  @Column()
  performance: string;

  @Column()
  performanceCode: string;

  @Column()
  productLine: string;

  @Column()
  hexCode: string;

  @Column()
  munsellNotationListing: string;

  @Column()
  tintStrength: string;
}
