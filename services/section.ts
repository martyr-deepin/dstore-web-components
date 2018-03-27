export enum SectionType {
  Carousel,
  Cover,
  Icon,
  Phrase,
  Ranking,
  Assemble,
  Topic
}

export class Section {
  type: SectionType;
  title: { [key: string]: string };
  colspan: number;
  rowspan: number;
  show: boolean;
  more: boolean;
  apps?: SectionApp[];
  topics?: SectionTopic[];
  ranking?: SectionRanking;
  assembleList?: SectionAssemble[];
}
export class SectionRanking {
  category: string;
  count: number;
}
export class SectionApp {
  name: string;
  show: boolean;
  image?: string;
  imageHD?: string;
  phrase?: { [key: string]: string };
}

export class SectionTopic {
  name: string;
  show: boolean;
  cover: string;
  coverHD: string;
  backgroupImage: string;
  backgroupImageHD: string;
  backgroupColor: string;
  apps: SectionApp[];
}
export class SectionAssemble {
  name: { [key: string]: string };
  show: boolean;
  apps: SectionApp[];
}
