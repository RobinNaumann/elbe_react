import { Button, Card, Column, ElbeTheme, Field, createBit } from "elbe-ui";

type _MiStade = {
  name: string;
};

const nameBit = createBit({
  worker: async (p: { a: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      name: p.a,
    } as _MiStade;
  },
  debugLabel: "nameBit",
  control: ({ act, parameters }) => ({
    setName: (name: string) =>
      act((_) => {
        console.log("setName", parameters.a);
        return { name };
      }, true),
  }),
});

export function Tests({}) {
  return (
    <ElbeTheme>
      <Card>
        <nameBit.Provider a={"hello"}>
          hello
          <_Consumer />
        </nameBit.Provider>
      </Card>
    </ElbeTheme>
  );
}

function _Consumer({}) {
  const bit = nameBit.use();
  return bit.mapUI((d) => (
    <Column>
      {d.name} you
      <Field.text
        flex
        label="Name"
        value={d.name}
        onInput={(e) => bit.setName(e)}
      />
      <Button.major
        label="back"
        ariaLabel="go back"
        onTap={bit.canGoBack ? () => bit.back() : undefined}
      />
    </Column>
  ));
}
