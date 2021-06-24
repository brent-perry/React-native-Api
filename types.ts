export interface Photo {
  albumId: number;
  id: number;
  title: string;
  thumbnailUrl: string;
}

export type StackParamList = {
  List: undefined;
  Detail: { photo: Photo };
};
