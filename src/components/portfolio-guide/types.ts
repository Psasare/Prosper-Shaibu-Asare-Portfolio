export interface VisitorProfile {
  name: string;
  role: string;
  addressedAs: string;
}

export interface TourStep {
  id: string;
  targetId: string;
  badge: string;
  title: string;
  getContent: (addressedAs: string) => string;
  tip?: string;
}
