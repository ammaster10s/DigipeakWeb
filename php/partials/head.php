<?php
if (!isset($pageTitle)) {
  $pageTitle = "DIGIPEAK OPS // GHOST TRACKER";
}
if (!isset($pageDescription)) {
  $pageDescription = "Defense-tech interface for high-precision drone engineering.";
}
?>
<!DOCTYPE html>
<html lang="en" class="bg-black">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="<?php echo htmlspecialchars($pageDescription, ENT_QUOTES); ?>" />
    <title><?php echo htmlspecialchars($pageTitle, ENT_QUOTES); ?></title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
    />
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/php/assets/site.css" />
  </head>