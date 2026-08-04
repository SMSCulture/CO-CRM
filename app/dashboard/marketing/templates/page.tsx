import { EmailTemplateBuilder } from "./components/email-template-builder";

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Templates</h2>
        <p className="mt-1 text-muted-foreground">
          Reusable email templates for Your Marketing campaigns — sent to your own contacts.
        </p>
      </div>
      <EmailTemplateBuilder />
    </div>
  );
}
