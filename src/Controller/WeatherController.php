<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Form;
use FOS\RestBundle\Controller\Annotations;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\FOSRestController;
use App\Entity\Weather;
use App\Form\WeatherType;

/**
 * @RouteResource("Weather")
 */
class WeatherController extends FOSRestController
{

    /**
     * Get the list of weathers.
     *
     * @param string $page integer with the page number (requires param_fetcher_listener: force)
     *
     * @return array data
     *
     * @View()
     * @QueryParam(name="page", requirements="\d+", default="1", description="Page of the overview.")
     */
    public function cgetAction($page)
    {
        $rows = 10;
        $repository = $this->getDoctrine()->getRepository(Weather::class);
        $paginator = $repository->findPaginated($page, $rows);

        $data = array(
            'page' => $page,
            'pages' => ceil($paginator->count() / $rows),
            'items' => array(),
        );
        foreach ($paginator as $k => $item) {
            $data['items'][$k] = $item;
        }
        return $this->handleView($this->view($data));
    }
    /**
     * Create a new resource.
     *
     * @param Request $request
     *
     * @return View view instance
     *
     * @View()
     */
    public function cpostAction(Request $request)
    {
        $weather = new Weather();
        $form = $this->createForm(WeatherType::class, $weather);

        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($weather);
            $entityManager->flush();
            return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_CREATED));
        }
        
        return $this->view($form);
    }
}
