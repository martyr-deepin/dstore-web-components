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
  image = '';
  imageHD = '';
}

export class SectionPhrase extends SectionApp {
  phrase: string[] = ['', ''];
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
  name: string[] = ['', ''];
  show = true;
  apps: SectionApp[] = [];
}

export function sectionAddItem(section: Section) {
  switch (section.type) {
    case SectionType.Carousel:
      section.items.push(new SectionCarousel());
      break;
    case SectionType.Cover:
      section.items.push(new SectionApp());
      break;
    case SectionType.Icon:
      section.items.push(new SectionApp());
      break;
    case SectionType.Phrase:
      section.items.push(new SectionPhrase());
      break;
    case SectionType.Assemble:
      section.items.push(new SectionAssemble());
      break;
    case SectionType.Topic:
      section.items.push(new SectionTopic());
  }
}
