import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FiturXyz() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Fitur XYZ" breadcrumb="Dashboard / Fitur XYZ">
        <button
          id="children-button"
          className="bg-biru text-white px-4 py-2 rounded-lg mr-2"
        >
          Export
        </button>
      </PageHeader>
      <p>Ini adalah halaman Fitur XYZ</p>

      <Button variant="default" size="sm">
        Batal
      </Button>
      <Button variant="outline">Batal</Button>
      <Button variant="destructive">Batal</Button>
      <Button variant="ghost">Batal</Button>
      <Button variant="link">Batal</Button>

      <Card className="mt-4 w-[380px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Belajar shadcn/ui</CardTitle>
            <Badge variant="secondary">Baru</Badge>
          </div>
          <CardDescription>
            Contoh penggunaan komponen shadcn/ui di React
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Komponen ini dibuat di branch <strong>setup-shadcn</strong>
            lalu di-merge ke main.
          </p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button>Simpan</Button>
          <Button variant="outline">Batal</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
