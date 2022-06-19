export abstract class Factory<T> {
  public abstract create(...args: string | any): T;
}
