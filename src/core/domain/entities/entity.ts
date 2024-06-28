import { Exclude } from 'class-transformer';

export abstract class Entity<Props> {
  @Exclude()
  protected props: Props;

  protected constructor(props: Props) {
    this.props = props;
  }
}
