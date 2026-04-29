$content = Get-Content "c:\Users\sidne\px-ao.github.io\preces.html" -Encoding UTF8 -Raw
Write-Host "Content length: " $content.Length
$old = @"
                            Vinde, Espírito Criador,<br/>
                            Ó vinde Espírito Criador, as nossas almas visitai e enchei os nossos corações com Vossos dons celestiais.<br/>
                            Vós sois chamado o Intercessor, do Deus excelso o dom sem par, a fonte viva, o fogo, o amor, a unção divina e salutar.<br/>
                            Sois doador dos sete dons, e sois poder na mão do Pai, por Ele prometido a nós, por nós Seus feitos proclamai.<br/>
                            A nossa mente iluminai, os corações enchei de amor, nossa fraqueza encorajai, qual força eterna e protetor.<br/>
                            Nosso inimigo repeli, e concedei-nos Vossa paz, se pela graça nos guiais, o mal deixamos para trás.<br/>
                            Ao Pai e ao Filho Salvador, por Vós possamos conhecer, que procedeis do Seu amor, fazei-nos sempre firmes crer.
"@
Write-Host "Old length: " $old.Length
$new = @"
                            Vinde, Espírito Criador,<br/>
visitai as almas dos vossos fiéis<br/>
e enchei de graça celeste<br/>
os corações que criastes.<br/><br/>
Vós sois chamado Consolador,<br/>
dom do Deus Altíssimo,<br/>
fonte viva, fogo, caridade<br/>
e unção espiritual.<br/><br/>
Vós sois o doador dos sete dons,<br/>
o dedo da mão de Deus,<br/>
promessa do Pai,<br/>
que enriqueceis a nossa palavra.<br/><br/>
Acendei a luz nos sentidos,<br/>
infundi o amor nos corações,<br/>
fortalecei com vigor constante<br/>
a fraqueza da nossa carne.<br/><br/>
Afastai para longe o inimigo,<br/>
dai-nos a paz sem demora;<br/>
guiados por vós, evitaremos<br/>
todo o mal.<br/><br/>
Fazei-nos conhecer o Pai,<br/>
revelai-nos o Filho,<br/>
e fazei que em vós, Espírito de ambos,<br/>
creiamos sempre.<br/><br/>
Glória a Deus Pai,<br/>
ao Filho que ressuscitou dos mortos,<br/>
e ao Espírito Consolador,<br/>
por todos os séculos dos séculos. Amém.
"@
Write-Host "New length: " $new.Length
$content = $content -replace [regex]::Escape($old), $new
Write-Host "After replace length: " $content.Length
Set-Content "c:\Users\sidne\px-ao.github.io\preces.html" -Value $content -Encoding UTF8
Write-Host "Done"
