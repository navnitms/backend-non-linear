export class CreateSegmentInput {
  videoId: string;
  url: string;
  segmentOrder: number;
}

export class UpdateSegmentInput {
  videoId?: number;
  url?: string;
  segmentOrder?: number;
}

export class CreateChoiceInput {
  label: string;
  segmentId: string;
  segmentChoices: CreateSegmentChoiceInput[];
}

export class CreateSegmentChoiceInput {
  nextSegmentId: string;
}
