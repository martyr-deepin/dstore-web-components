export enum SectionType {
  Carousel,
  Cover,
  Icon,
  Phrase,
  Ranking,
  Assemble,
  Topic,
}

export class Section {
  type: SectionType = SectionType.Carousel;
  title: string[] = ['新建栏目', ''];
  colSpan = 1;
  rowSpan = 1;
  show = true;
  more = true;
  items = [];
  ranking: SectionRanking = new SectionRanking();
}

export class SectionRanking {
  category = '';
  count = 10;
}

export class SectionApp {
  name = '';
  show = true;
}

export class SectionCarousel extends SectionApp {
  images: string[] = [];
}

export class SectionPhrase extends SectionApp {
  phrases: string[] = ['', ''];
}

export class SectionTopic {
  name: string[] = ['', ''];
  show = true;
  cover = '';
  coverHD = '';
  backgroundImage = '';
  backgroundImageHD = '';
  backgroundColor = '';
  apps: SectionApp[] = [];
}

export class SectionAssemble {
  category = '';
  show = true;
  apps: SectionApp[] = [];
}

export function sectionAddItem(section: Section) {
  const newSectionItem = {
    [SectionType.Carousel]: new SectionCarousel(),
    [SectionType.Cover]: new SectionApp(),
    [SectionType.Icon]: new SectionApp(),
    [SectionType.Phrase]: new SectionPhrase(),
    [SectionType.Assemble]: new SectionAssemble(),
    [SectionType.Topic]: new SectionTopic(),
  };
  if (newSectionItem[section.type]) {
    section.items = [...section.items, newSectionItem[section.type]];
  }
}
