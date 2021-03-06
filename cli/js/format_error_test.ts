// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { assert, test } from "./test_util.ts";

test(function formatDiagnosticBasic() {
  const fixture: Deno.DiagnosticItem[] = [
    {
      message: "Example error",
      category: Deno.DiagnosticCategory.Error,
      sourceLine: "abcdefghijklmnopqrstuv",
      lineNumber: 1000,
      scriptResourceName: "foo.ts",
      startColumn: 1,
      endColumn: 2,
      code: 4000
    }
  ];
  const out = Deno.formatDiagnostics(fixture);
  assert(out.includes("Example error"));
  assert(out.includes("foo.ts"));
});

test(function formatDiagnosticError() {
  let thrown = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bad = ([{ hello: 123 }] as any) as Deno.DiagnosticItem[];
  try {
    Deno.formatDiagnostics(bad);
  } catch (e) {
    assert(e instanceof TypeError);
    thrown = true;
  }
  assert(thrown);
});

if (import.meta.main) {
  Deno.runTests();
}
