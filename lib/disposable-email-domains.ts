/**
 * Known disposable / throwaway email domains.
 * Bots use these to receive OTP codes programmatically.
 * Silent fake-success is returned — never reveal the block to the sender.
 *
 * Source: github.com/disposable-email-domains/disposable-email-domains
 * Trimmed to the most common offenders; extend as needed.
 */
export const DISPOSABLE_DOMAINS = new Set([
  // --- High-volume disposable services ---
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org',
  'guerrillamail.biz', 'guerrillamail.de', 'guerrillamail.info',
  'temp-mail.org', 'tempmail.com', 'throwam.com', 'fakeinbox.com',
  'yopmail.com', 'yopmail.fr', 'sharklasers.com', 'guerillamail.com',
  'trashmail.com', 'trashmail.me', 'trashmail.net', 'trashmail.org',
  'trashmail.at', 'trashmail.io', 'trashmail.xyz',
  'mailnull.com', 'spamgourmet.com', 'spamgourmet.net', 'spamgourmet.org',
  'maildrop.cc', 'dispostable.com', 'throwam.com', 'tempr.email',
  'discard.email', 'spamspot.com', 'spamthisplease.com',
  'mailexpire.com', 'spamex.com', 'trashdevil.com', 'trashdevil.de',
  'mailbucket.org', 'mail-temp.com', 'spam4.me', 'getonemail.com',
  'getonemail.net', 'spamfree24.org', 'spamfree24.de', 'spamfree24.net',
  'spamfree24.eu', 'spamfree24.info',

  // --- 10-minute mail variants ---
  '10minutemail.com', '10minutemail.net', '10minutemail.org',
  '10minutemail.de', '10minutemail.co.uk', '10minutemail.us',
  '10minutemail.be', '10minutemail.cf', '10minutemail.ga',
  '10minutemail.gq', '10minutemail.ml', '10minutemail.tk',
  'ten-minute-mail.com', 'tenminutemail.com', 'tenminutemail.net',
  'tempinbox.com', 'tempinbox.co.uk',

  // --- Throwaway / burner services ---
  'throwaway.email', 'throwam.com', 'burnermail.io', 'burnthespam.info',
  'deadaddress.com', 'discard.email', 'discardmail.com', 'discardmail.de',
  'filzmail.com', 'hatespam.org', 'hidemail.de', 'hmamail.com',
  'ieatspam.eu', 'ieatspam.info', 'jetable.fr.nf', 'jetable.net',
  'jetable.org', 'jetable.pp.ua', 'junk1.tk', 'kasmail.com',
  'kaspop.com', 'killmail.com', 'killmail.net', 'klzlk.com',
  'kulturbetrieb.info', 'kurzepost.de', 'lifebyfood.com', 'link2mail.net',
  'litedrop.com', 'lol.ovpn.to', 'lolfreak.net', 'lookugly.com',

  // --- Temp-mail variants ---
  'tempmail.net', 'tempmail.de', 'tempmailer.com', 'tempmailer.de',
  'tempe-mail.com', 'temporaryemail.net', 'temporaryforwarding.com',
  'temporaryinbox.com', 'temporarymailaddress.com', 'thanksnospam.info',
  'thisisnotmyrealemail.com', 'throam.com', 'trbvm.com', 'tradermail.info',

  // --- Spam trap domains ---
  'spamgob.com', 'spamhereplease.com', 'spamhole.com', 'spamify.com',
  'spaminator.de', 'spamkill.info', 'spaml.com', 'spaml.de',
  'spammotel.com', 'spamoff.de', 'spamovore.com', 'spamtrap.ro',

  // --- Common bot-farm domains ---
  'fakemail.net', 'fakemailgenerator.com', 'fakemail.fr', 'fakeemailgenerator.com',
  'mailnesia.com', 'mailnew.com', 'mailnull.com', 'mailseal.de',
  'mailshell.com', 'mailsiphon.com', 'mailslite.com', 'mailzilla.com',
  'mailzilla.org', 'mbx.cc', 'mega.zik.dj', 'meltmail.com',
  'mierdamail.com', 'mintemail.com', 'misterpinball.de', 'moncourrier.fr.nf',
  'monemail.fr.nf', 'monmail.fr.nf', 'msa.minsmail.com', 'mt2009.com',
  'mucincanon.com', 'mx0.wwwnew.eu', 'myspaceinc.com', 'myspaceinc.net',
  'myspaceinc.org', 'myspacepimpedup.com', 'myspamless.com', 'mytrashmail.com',

  // --- Nada / Mohmal / Guerrilla variants ---
  'nada.email', 'nada.ltd', 'nadaemail.com', 'mohmal.com',
  'spamgourmet.net', 'spamgourmet.org', 'notsharingmy.info',
  'nowmymail.com', 'nwldx.com', 'objectmail.com', 'obobbo.com',
  'odnorazovoe.ru', 'oneoffemail.com', 'onewaymail.com', 'online.ms',
  'oopi.org', 'opayq.com', 'ordinaryamerican.net', 'otherinbox.com',
]);

/**
 * Returns true if the email domain is a known disposable/throwaway service.
 */
export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase().trim();
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}
