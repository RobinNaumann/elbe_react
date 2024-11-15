import React from "preact/compat";

export type PaddedProps = {
  children: any;
};

export class Padded extends React.Component<
  PaddedProps & {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
> {
  constructor(
    props: PaddedProps & {
      top: number;
      right: number;
      bottom: number;
      left: number;
    }
  ) {
    super(props);
  }

  static all = ({ amount = 1, ...p }: PaddedProps & { amount: number }) => (
    <Padded
      {...{ ...p, top: amount, right: amount, bottom: amount, left: amount }}
    />
  );

  static symmetric = ({
    vertical = 0,
    horizontal = 0,
    ...p
  }: PaddedProps & { vertical: number; horizontal: number }) => (
    <Padded
      {...{
        ...p,
        top: vertical,
        bottom: vertical,
        left: horizontal,
        right: horizontal,
      }}
    />
  );

  render() {
    return (
      <div
        style={{
          paddingTop: `${this.props.top}rem`,
          paddingRight: `${this.props.right}rem`,
          paddingBottom: `${this.props.bottom}rem`,
          paddingLeft: `${this.props.left}rem`,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
