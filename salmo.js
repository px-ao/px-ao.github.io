// JavaScript Document
function DicSalmos(dado, vini, vfim) {
	    //alert("DicSalmos");
		
	    let versl = localStorage.getItem('versao');
	  
		var AllSalmos;				
		if (versl == 'H') {
		
			AllSalmos = AllSalmoH;
			
		} else if ( versl == 'G') {
			
			AllSalmos = AllSalmosG;
			
		} else if ( versl != 'G' && versl != 'H' ) {
				   
			alert ("Escolha uma versão da Tradução do Salmo.");	
			return ;
		}
	
	   let chaveMapa = dado;
	   var lsize = vfim ;
		///alert ("antes > " + lsize);
		if (vfim == 0 ) {
			var lsize = parseInt(AllSalmos.get("Size." + chaveMapa)) - 1;
			
		} 
		///alert ("Depois > "+lsize);	
      
        let lSalmo = "";

        let tagPi ="";

        let tagPf="";
	    
	    
		let versoini = vini;
		
     
        if (chaveMapa == undefined || chaveMapa == null || chaveMapa.trim() == ""  ) 
        {
            
            return;
        }
				
			    
        if ( chaveMapa < 1 || chaveMapa > 150   ) {
			 
				     alert("Digite um número inteiro entre 1 e 150");
			         return;
			
		} 


        for (var i = parseInt(versoini); i <= parseInt(lsize) ; i++) {

            tagPi="<spam class='cversos'>";

            tagPf="</spam><br>";

                     	      
			if ( i>0){
			lSalmo += tagPi + i + AllSalmos.get(chaveMapa + "." + i) + tagPf ; 
			 
			}
        

        }
	    
	            //Colocando o Capítulo(título) do Salmo. Ex: Salmo 23 antes //dos Salmo.
				tagPi="<p id='idtsalmo'><span id='idvolta' onclick='Fvolta(" + chaveMapa +")'>&#9668;</span> ";
                tagPf=" <span id='idsegue' onclick='Fsegue(" + chaveMapa +")'>&#9658;</span></p>";
				lSalmo = tagPi +  AllSalmos.get(chaveMapa + "." + 0) + tagPf + lSalmo ;

        document.getElementById('DivSalmo').innerHTML = lSalmo;

        return;

    }